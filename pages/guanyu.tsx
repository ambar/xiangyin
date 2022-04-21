import type {NextPage} from 'next'
import BasePage from '../biz/BasePage'
import Guanyu from '../biz/Guanyu'

const Home: NextPage = () => {
  return (
    <BasePage>
      <Guanyu />
    </BasePage>
  )
}

export default Home
