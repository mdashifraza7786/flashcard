import TopicCard from "@/components/TopicCard"

const Learning = () => {
    const sampleData = [
        {id:1,topicTitle:"What is Array?",percent:94},
        {id:2,topicTitle:"What is Array?",percent:55},
        {id:3,topicTitle:"What is Array?",percent:30},
        {id:4,topicTitle:"What is Array?",percent:63},
    ]
  return (
   <section className="flex flex-col gap-14">
    <h1 className="text-3xl font-semibold tracking-wider">Learning Area</h1>
    <div className="flex flex-col gap-5">
        {sampleData && sampleData.map((item,index)=>(
            <TopicCard key={index} percent={item.percent} id={item.id} title={item.topicTitle}/>
        ))}
        
    </div>
   </section>
  )
}

export default Learning