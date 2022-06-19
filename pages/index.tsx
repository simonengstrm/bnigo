import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import DatabaseService from '../lib/db.service'
import { Bingo } from '../lib/types'
import BingoCard from '../src/components/BingoCard'
import Page from '../src/components/Page'

// Get bingos
export async function getServerSideProps() {
  return {
    props: {
      bingos: await new DatabaseService().getBingos(),
    }
  }
}

export default function Index ({ bingos }: { bingos: Bingo[] }) {
  return (
    <Page>
      <div>
        {bingos.map( (bingo, id) => (
          <div key={id}>
            <BingoCard bingo={bingo} />
          </div>
        ) )}
      </div>
    </Page>
  )
}

