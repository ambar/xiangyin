import {GetServerSideProps} from 'next'

const getServerSideJyinProps: GetServerSideProps = async ({req}) => {
  let initialJyin = req.cookies['jyin'] ?? null
  return {
    props: {initialJyin},
  }
}

export default getServerSideJyinProps
