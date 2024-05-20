#!/usr/bin/env -S node --trace-warnings
// # vim: tabstop=2 shiftwidth=2 expandtab

import fs from "node:fs";
import v8 from "node:v8";

// import * as d3 from "d3-array";

import {
  CloudWatchClient,
  ListMetricsCommand,
  PutMetricDataCommand,
} from "@aws-sdk/client-cloudwatch";

class EC2InstanceMetadataService {
  #urlbase = "http://169.254.169.254/latest/meta-data";
  #token;
  tokenReady; // : Promise<string>;

  constructor() {
    this.tokenReady = this.getToken();
  }

  async getToken() {
    const token = await fetch("http://169.254.169.254/latest/api/token", {
      method: "PUT",
      headers: {
        "X-aws-ec2-metadata-token-ttl-seconds": 21600,
      },
    }).then((res) => res.text());

    console.log("set token:", token);
    return (this.#token = token);
  }

  async getInstanceId() {
    // const token = await this.getToken();
    if (!this.#token)
      await // delay(100);
      this.tokenReady;
    // console.log('running getInstanceId with token:', this.#token);
    const instanceId = await fetch(
      `http://169.254.169.254/latest/meta-data/instance-id`,
      {
        // method: '',
        headers: {
          "X-aws-ec2-metadata-token": this.#token,
        },
      },
    ).then((res) => res.text());
    // console.log('res?:', res.status, res.statusText, res.ok, res.headers);

    return instanceId;
  }

  async getImageId() {
    if (!this.#token)
      await // delay(100);
      this.tokenReady;

    return fetch(`${this.#urlbase}/ami-id`, {
      headers: {
        "X-aws-ec2-metadata-token": this.#token,
      },
    }).then((res) => res.text());
  }

  async getInstanceType() {
    if (!this.#token)
      await // delay(100);
      this.tokenReady;
    return fetch(`${this.#urlbase}/instance-type`, {
      headers: {
        "X-aws-ec2-metadata-token": this.#token,
      },
    }).then((res) => res.text());
  }

  async getRegion() {
    if (!this.#token)
      await // delay(100);
      this.tokenReady;
    return fetch(`${this.#urlbase}/placement/region`, {
      headers: {
        "X-aws-ec2-metadata-token": this.#token,
      },
    }).then((res) => res.text());
  }
}

const imds = new EC2InstanceMetadataService();
// await imds.tokenReady;
const region = await imds.getRegion();
console.log(new Date(), `get region:`, region);

export const client = new CloudWatchClient({ region });

export async function main() {
  const started = Date.now();

  const instanceId = await imds.getInstanceId();
  console.log("running on instanceId:", instanceId);

  // Use the AWS console to see available namespaces and metric names. Custom metrics can also be created.
  // https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/viewing_metrics_with_cloudwatch.html
  const command = new ListMetricsCommand({
    Dimensions: [
      // { Name: "LogGroupName", },
      { Name: "InstanceId", Value: instanceId },
    ],
    // MetricName: "mem_used_percent",
    // Namespace: "System/Linux",
  });

  const out = await client.send(command);
  console.log("output:", out?.Metrics?.length);
  // console.log("output:", out.Metrics);
  console.dir(
    out.Metrics.filter(
      (
        m, // m.Dimensions.length >= 3
      ) => m.MetricName?.match(/percent/i),
    ),
    { depth: null },
  );

  const dimensions = {
    InstanceId: instanceId,
    ImageId: await imds.getImageId(),
    InstanceType: await imds.getInstanceType(),
  };

  const systemMemObj = await SendSystemMemInfo(dimensions);

  SendNextjsMemInfo(dimensions, systemMemObj);
  SendV8Metrics(dimensions);

  // setInterval(SendMetrics, 5e3, dimensions);

  const nextTs = Math.ceil(started / 60e3) * 60e3;
  console.log(new Date(), "set exit at nextTs:", new Date(nextTs));
  setTimeout(
    () => {
      console.log(new Date(), "runtime out at alignment of next 1 minute.");
      process.exit();
    },
    nextTs - started,
    1,
  );
}

async function SendV8Metrics(dimensions) {
  const stats = v8.getHeapStatistics();
  console.log("v8:", stats);

  const started = new Date();
  const Dimensions = Object.entries({ ...dimensions }).map(([Name, Value]) => ({
    Name,
    Value,
  }));
  const putCmd = new PutMetricDataCommand({
    Namespace: "System/Nodejs", // required
    MetricData: [
      {
        MetricName: "heap_size_limit",
        Dimensions,
        Timestamp: started, // new Date(), // ("TIMESTAMP"),
        Value: stats.heap_size_limit, // Number("double"),
        Unit: "Bytes",
      },
      {
        MetricName: "used_heap_size",
        Dimensions,
        Timestamp: started, // new Date(), // ("TIMESTAMP"),
        Value: stats.used_heap_size, // Number("double"),
        Unit: "Bytes",
      },
    ],
  });
  console.log(new Date(), "send putCmd:", putCmd, putCmd.input);
  console.dir(putCmd.input, { depth: null });

  const putCmdOut = await client.send(putCmd);
  console.log(new Date(), "SendV8Metrics putCmdOut:", putCmdOut);
}

async function SendSystemMemInfo(dimensions) {
  const timestamp = new Date();
  const contents = await fs.promises.readFile("/proc/meminfo", {
    encoding: "utf8",
  });
  const lines = contents
    .trim()
    .split("\n")
    .map((line) => {
      const ma = line.trim().match(/^(\S+):\s+(\d+)\s*(\S+)?$/);
      if (!ma) return;
      const [, key, value, unit] = ma;
      return { key, value: parseInt(value), unit };
    })
    .filter(Boolean);
  const obj = new Map(lines.map((d) => [d.key, d]));
  console.log(timestamp, `read meminfo:`, obj);

  const Dimensions = Object.entries({ ...dimensions }).map(([key, value]) => ({
    Name: key,
    Value: value,
  }));

  const MemTotal = obj.get("MemTotal").value;
  const MemFree = obj.get("MemFree").value;
  const MemBuffers = obj.get("Buffers").value;
  const MemCached = obj.get("Cached").value;
  // https://github.com/shirou/gopsutil/blob/master/mem/mem_linux.go#L333C2-L334
  const MemUsed = MemTotal - MemFree - MemBuffers - MemCached;
  const MemAvailable = obj.get("MemAvailable").value;
  console.log(new Date(), `memory metrics:`, {
    MemTotal,
    MemFree,
    MemBuffers,
    MemCached,
    MemAvailable,
    MemUsed,
  });

  const putCmd = new PutMetricDataCommand({
    Namespace: "System/Linux", // required
    MetricData: [
      {
        MetricName: "MemTotal",
        Dimensions,
        Timestamp: timestamp, // new Date(), // ("TIMESTAMP"),
        Value: MemTotal, // Number("double"),
        Unit: obj.get("MemTotal").unit === "kB" ? "Kilobytes" : "Bytes",
      },
      {
        MetricName: "MemFree",
        Dimensions,
        Timestamp: timestamp, // new Date(), // ("TIMESTAMP"),
        Value: MemFree, // Number("double"),
        Unit: obj.get("MemFree").unit === "kB" ? "Kilobytes" : "Bytes",
      },
      {
        MetricName: "MemBuffers",
        Dimensions,
        Timestamp: timestamp, // new Date(), // ("TIMESTAMP"),
        Value: MemBuffers, // Number("double"),
        Unit: obj.get("Buffers").unit === "kB" ? "Kilobytes" : "Bytes",
      },
      {
        MetricName: "MemCached",
        Dimensions,
        Timestamp: timestamp, // new Date(), // ("TIMESTAMP"),
        Value: MemCached, // Number("double"),
        Unit: obj.get("Cached").unit === "kB" ? "Kilobytes" : "Bytes",
      },
      {
        MetricName: "MemUsed",
        Dimensions,
        Timestamp: timestamp, // new Date(), // ("TIMESTAMP"),
        Value: MemUsed, // Number("double"),
        Unit: obj.get("MemFree").unit === "kB" ? "Kilobytes" : "Bytes",
      },
      {
        MetricName: "MemUsedPercent",
        Dimensions,
        Timestamp: timestamp, // new Date(), // ("TIMESTAMP"),
        Value: (100.0 * MemUsed) / MemTotal, // Number("double"),
        Unit: "Percent",
      },
      {
        MetricName: "MemAvailable",
        Dimensions,
        Timestamp: timestamp, // new Date(), // ("TIMESTAMP"),
        Value: MemAvailable, // Number("double"),
        Unit: obj.get("MemAvailable").unit === "kB" ? "Kilobytes" : "Bytes",
      },
    ].filter(Boolean),
  });

  const putCmdOut = await client.send(putCmd);
  console.log(new Date(), "SendSystemMemInfo putCmdOut:", putCmdOut);

  const nextTs = Math.ceil(timestamp / 15e3) * 15e3;
  setTimeout(SendSystemMemInfo, nextTs - Date.now(), dimensions);

  return obj;
}

async function SendNextjsMemInfo(dimensions, systemMemObj) {
  const MemTotal = systemMemObj.get("MemTotal");

  const contents = await fs.promises.readFile(
    "/sys/fs/cgroup/system.slice/web.service/cgroup.procs",
    {
      encoding: "utf8",
    },
  );
  const pids = contents
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => parseInt(w.trim()));
  console.log(`get web.service pids:`, pids);

  let mainNextjsPID;
  for (mainNextjsPID of pids) {
    console.log(`trying pid:`, mainNextjsPID);
    const cmdline = await fs.promises.readFile(
      `/proc/${mainNextjsPID}/cmdline`,
      {
        encoding: "utf8",
      },
    );
    console.log(`get cmdline:`, cmdline);
    if (cmdline.includes(".bin/next")) break;
  }

  const timestamp = new Date();
  const contentsStatusPid = await fs.promises.readFile(
    `/proc/${mainNextjsPID}/status`,
    {
      encoding: "utf8",
    },
  );

  // VmSize:	11721664 kB
  // VmRSS:	  252872 kB
  // Threads:	17
  const statusPid = contentsStatusPid
    .trim()
    .split("\n")
    .filter((line) => line.match(/^(VmSize|VmRSS|Threads):/))
    .map((line) => {
      const ma = line.trim().match(/^(\S+):\s+(\d+)\s*(\S+)?$/);
      if (!ma) return;
      const [, key, value, unit] = ma;
      return { key, value: parseInt(value), unit };
    })
    .filter(Boolean);
  const obj = new Map(statusPid.map((d) => [d.key, d]));
  console.log(`main nextjs pid:`, mainNextjsPID, obj);

  const Dimensions = Object.entries({ ...dimensions }).map(([Name, Value]) => ({
    Name,
    Value,
  }));
  const putCmd = new PutMetricDataCommand({
    Namespace: "System/Nodejs", // required
    MetricData: [
      {
        MetricName: "NextjsVmSize",
        Dimensions,
        Timestamp: timestamp, // new Date(), // ("TIMESTAMP"),
        Value: obj.get("VmSize").value, // Number("double"),
        Unit: obj.get("VmSize").unit === "kB" ? "Kilobytes" : "Count",
      },
      {
        MetricName: "NextjsVmRSS",
        Dimensions,
        Timestamp: timestamp, // new Date(), // ("TIMESTAMP"),
        Value: obj.get("VmRSS").value, // Number("double"),
        Unit: obj.get("VmSize").unit === "kB" ? "Kilobytes" : "Count",
      },
      MemTotal?.value &&
        MemTotal?.unit === obj.get("VmSize").unit && {
          MetricName: "NextjsMemPercent",
          Dimensions,
          Timestamp: timestamp, // new Date(), // ("TIMESTAMP"),
          Value: (100.0 * obj.get("VmRSS").value) / MemTotal.value, // Number("double"),
          Unit: "Percent",
        },
      {
        MetricName: "NextjsThreads",
        Dimensions,
        Timestamp: timestamp, // new Date(), // ("TIMESTAMP"),
        Value: obj.get("Threads").value, // Number("double"),
        Unit: obj.get("Threads").unit === "kB" ? "Kilobytes" : "Count",
      },
    ].filter(Boolean),
  });

  const putCmdOut = await client.send(putCmd);
  console.log(new Date(), "SendNextjsMemInfo putCmdOut:", putCmdOut);

  const nextTs = Math.ceil(timestamp / 5e3) * 5e3; // align to next 5 seconds
  setTimeout(SendNextjsMemInfo, nextTs - Date.now(), dimensions, systemMemObj);
}

// function delay(ms, ...args) { return new Promise((fulfilled) => setTimeout(fulfilled, ms, args)); }

main().catch((err) => console.error(new Date(), "ERROR:", err));
