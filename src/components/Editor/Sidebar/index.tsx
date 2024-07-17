import SidebarCampaign from './Campaign'
import Collection from './Collection'
import Cover from './Cover'
import Management from './Management'
import SidebarArticleResponse from './Response'
import Tags from './Tags'

const Sidebar = {
  Cover,
  Tags,
  Collection,
  Management,
  Response: SidebarArticleResponse,
  Campaign: SidebarCampaign,
}

export default Sidebar
