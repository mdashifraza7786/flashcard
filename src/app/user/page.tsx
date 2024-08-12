import TopicCard from "@/components/TopicCard";

const Dashboard = () => {
    const sampleData = [
        {
            id: 1,
            topicTitle: "Introduction to Data Structures",
            questions: [
                { question: "What is a data structure?", answer: "A data structure is a way of organizing and storing data so that it can be accessed and modified efficiently." },
                { question: "What are the types of data structures?", answer: "Common types include arrays, linked lists, stacks, queues, trees, and graphs." },
                { question: "What is the difference between linear and non-linear data structures?", answer: "Linear data structures have a sequential arrangement, while non-linear data structures do not." },
                { question: "Why are data structures important?", answer: "They help in managing large amounts of data efficiently, making them essential for various computational tasks." },
            ],
        },
        {
            id: 2,
            topicTitle: "Algorithm Analysis",
            questions: [
                { question: "What is an algorithm?", answer: "An algorithm is a step-by-step procedure or formula for solving a problem." },
                { question: "What is time complexity?", answer: "Time complexity is a measure of the amount of time an algorithm takes to complete as a function of the length of the input." },
                { question: "What is space complexity?", answer: "Space complexity is a measure of the amount of memory an algorithm uses in relation to the input size." },
                { question: "What is Big-O notation?", answer: "Big-O notation is a mathematical representation used to describe the upper bound of an algorithm's running time or space requirements." },
            ],
        },
        {
            id: 3,
            topicTitle: "Sorting Algorithms",
            questions: [
                { question: "What is a sorting algorithm?", answer: "A sorting algorithm is a method for arranging elements in a list or array in a certain order." },
                { question: "Why is sorting important?", answer: "Sorting is crucial for optimizing the efficiency of other algorithms, like search algorithms, that require sorted data." },
                { question: "What is the difference between comparison-based and non-comparison-based sorting?", answer: "Comparison-based sorting compares elements to determine the order, while non-comparison-based sorting uses operations like counting or hashing." },
                { question: "What is stability in sorting algorithms?", answer: "Stability refers to the preservation of the relative order of equal elements in a sorted array." },
            ],
        },
        {
            id: 4,
            topicTitle: "Graph Theory Basics",
            questions: [
                { question: "What is a graph in data structures?", answer: "A graph is a collection of nodes (vertices) and edges connecting pairs of nodes, used to represent networks." },
                { question: "What is the difference between directed and undirected graphs?", answer: "In directed graphs, edges have a direction, while in undirected graphs, edges do not." },
                { question: "What is a tree in graph theory?", answer: "A tree is a special type of graph that is connected and has no cycles." },
                { question: "What is a path in a graph?", answer: "A path is a sequence of edges that connects two nodes in a graph." },
            ],
        },
    ];

    return (
        <section className="flex flex-col gap-14">
            <h1 className="text-3xl font-semibold tracking-wider">User SIde</h1>
            <div className="flex flex-col gap-5">
                {sampleData.map((item) => (
                    <TopicCard
                        key={item.id}
                        id={item.id}
                        title={item.topicTitle}
                        questions={item.questions}
                    />
                ))}
            </div>
        </section>
    );
};

export default Dashboard;
