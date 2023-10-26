'use client'

import Nav from '@/components/Nav/Nav'
import Game from '@/components/Game/Game'
import { selectGameSize, useSelector, selectLevel } from '@/lib/redux'
import Layout from '@/components/Layout/Layout'
import styles from '@/styles/layout.module.css'


export default function IndexPage() {
  const size = useSelector(selectGameSize)
  const level = useSelector(selectLevel)


  return (
    <>
      <Nav />
      <Layout home pageTitle={`Memory game`}>
        <Game />
        <span className={styles.level}>{level}</span> 
      </Layout>
    </>
  )
}