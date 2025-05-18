import Layout from "@/components/layout/Layout"
import HeroBanner from "@/components/home/HeroBanner"
import EventInfo from "@/components/home/EventInfo"
import Speakers from "@/components/home/Speakers"
import SubmissionCTA from "@/components/home/SubmissionCTA"
import Sponsors from "@/components/home/Sponsors"

export default function Home() {
  return (
    <Layout>
      <HeroBanner />
      <EventInfo />
      <Speakers />
      <SubmissionCTA />
      <Sponsors />
    </Layout>
  )
}
