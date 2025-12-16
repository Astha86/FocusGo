import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
	const [isLoading, setIsLoading] = useState(false);
	const todos = [
		{
			_id: 1,
			body: "Learn Golang",
			completed: false,
		},
		{
			_id: 2,
			body: "Hit the gym",
			completed: true,
		},
		{
			_id: 3,
			body: "Cook dinner",
			completed: false,
		},
		{
			_id: 4,
			body: "Do DSA",
			completed: true,
		},
	];
	return (
		<>
			<Text fontSize={"4xl"} textTransform={"uppercase"} fontWeight={"bold"} textAlign={"center"} my={2}>
				Today's Tasks
			</Text>
			{isLoading && (
				<Flex justifyContent={"center"} my={4}>
					<Spinner size={"lg"} />
				</Flex>
			)}
			{!isLoading && todos?.length === 0 && (
				<Stack alignItems={"center"} gap='3'>
					<Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
						All tasks completed! 🤞
					</Text>
					<img src='/go.png' alt='Go logo' width={70} height={70} />
				</Stack>
			)}
			<Stack gap={3}>
				{todos?.map((todo) => (
					<TodoItem key={todo._id} todo={todo} />
				))}
			</Stack>
		</>
	);
};
export default TodoList;