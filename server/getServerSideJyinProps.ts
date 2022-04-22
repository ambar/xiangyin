import Cookies from 'cookies'
import type {NextPageContext} from 'next'

export default async function getServerSideJyinProps({
  req,
  res,
}: NextPageContext) {
  let initialJyin = null
  if (req && res) {
    const cookies = new Cookies(req, res)
    initialJyin = cookies.get('jyin') ?? null
  }
  return {
    props: {initialJyin},
  }
}
