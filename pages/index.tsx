import type {InferGetServerSidePropsType} from 'next'
import BasePage from '../biz/BasePage'
import Zhuyin from '../biz/Zhuyin'

const Home = ({
  initialJyin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <BasePage initialJyin={initialJyin}>
      <Zhuyin />
    </BasePage>
  )
}

// export const getServerSideProps = getServerSideJyinProps

export default Home
