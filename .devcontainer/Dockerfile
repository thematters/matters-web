ARG USERNAME=node

# [Choice] Node.js version: 16, 14, 12
ARG VARIANT=12-buster
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# Install tslint, typescript, commitizen. eslint is installed by javascript image
ARG NODE_MODULES="tslint-to-eslint-config typescript commitizen"
COPY library-scripts/meta.env /usr/local/etc/vscode-dev-containers
RUN su node -c "umask 0002 && npm install -g ${NODE_MODULES}" \
  && npm cache clean --force > /dev/null 2>&1

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends vim

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# Install Moby CLI and Engine
COPY library-scripts/*.sh library-scripts/*.env first-run-notice.txt /tmp/library-scripts/
RUN  bash /tmp/library-scripts/docker-in-docker-debian.sh "true" "${USERNAME}" "true"

# Mount for docker-in-docker
VOLUME [ "/var/lib/docker" ]

# Fire Docker/Moby script if needed along with Oryx's benv
ENTRYPOINT [ "/usr/local/share/docker-init.sh", "/usr/local/share/ssh-init.sh", "benv" ]
CMD [ "sleep", "infinity" ]

# [Optional] Install debugger for development of Codespaces - Not in resulting image by default
ARG DeveloperBuild
RUN if [ -z $DeveloperBuild ]; then \
  echo "not including debugger" ; \
  else \
  curl -sSL https://aka.ms/getvsdbgsh | bash /dev/stdin -v latest -l /vsdbg ; \
  fi

USER ${USERNAME}

# Move first run notice to right spot
RUN mkdir -p /usr/local/etc/vscode-dev-containers/ \
  && mv -f /tmp/library-scripts/first-run-notice.txt /usr/local/etc/vscode-dev-containers/
