import type {NextPage} from 'next'
import BasePage from '../biz/BasePage'
import Zhuyin from '../biz/Zhuyin'

const Home: NextPage = () => {
  return (
    <BasePage>
      <Zhuyin />
    </BasePage>
  )
}

export default Home
