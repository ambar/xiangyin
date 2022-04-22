import type {InferGetServerSidePropsType} from 'next'
import getServerSideJyinProps from '~/server/getServerSideJyinProps'
import BasePage from '../biz/BasePage'
import Yinjie from '../biz/Yinjie'

const Home = ({
  initialJyin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <BasePage initialJyin={initialJyin}>
      <Yinjie />
    </BasePage>
  )
}

export const getServerSideProps = getServerSideJyinProps

export default Home
