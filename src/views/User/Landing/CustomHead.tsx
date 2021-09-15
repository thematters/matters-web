import { Head, useRoute } from '~/components'

import { URL_QS } from '~/common/enums'

import IMAGE_LOGO_192 from '@/public/static/icon-192x192.png'

type CustomHeadProps = {
  user: {
    displayName: string | null
    info: {
      description: string | null
      profileCover: string | null
    }
  }
}

const CustomHead: React.FC<CustomHeadProps> = ({ user }) => {
  const { getQuery } = useRoute()
  const shareSource = getQuery(URL_QS.SHARE_SOURCE_ONBOARDING_TASKS.key)
  const isShareOnboardingTasks =
    shareSource === URL_QS.SHARE_SOURCE_ONBOARDING_TASKS.value

  return (
    <Head
      title={{
        zh_hant: isShareOnboardingTasks
          ? `${user.displayName} 已解鎖新手獎賞，快點加入 Matters 獲得創作者獎勵吧`
          : `${user.displayName} 的創作空間站`,
        zh_hans: isShareOnboardingTasks
          ? `${user.displayName} 已解锁新手奖赏，快点加入 Matters 获得创作者奖励吧`
          : `${user.displayName} 的创作空间站`,
        en: isShareOnboardingTasks
          ? `${user.displayName} has unlocked new user reward, join Matters to get creator reward`
          : `${user.displayName}'s creative space`,
      }}
      noSuffix={isShareOnboardingTasks}
      description={user.info.description}
      image={user.info.profileCover || IMAGE_LOGO_192.src}
    />
  )
}

export default CustomHead
