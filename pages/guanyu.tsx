import type {InferGetServerSidePropsType} from 'next'
import getServerSideJyinProps from '~/server/getServerSideJyinProps'
import BasePage from '../biz/BasePage'
import Guanyu from '../biz/Guanyu'

const Home = ({
  initialJyin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <BasePage initialJyin={initialJyin}>
      <Guanyu />
    </BasePage>
  )
}

export const getServerSideProps = getServerSideJyinProps

export default Home
