import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { BASE_URL } from "../App";

type CreateTodoResponse = {
	id: string;
	body: string;
	done: boolean;
};

const TodoForm = () => {
	const [newTodo, setNewTodo] = useState("");

	const inputRef = useRef<HTMLInputElement>(null);
	const queryClient = useQueryClient();

	const { mutate: createTodo, isPending: isCreating } = useMutation<
		CreateTodoResponse,
		Error,
		void
	>({
		mutationKey: ["createTodo"],
		mutationFn: async () => {
			const res = await fetch(`${BASE_URL}/todos`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ body: newTodo }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Something went wrong");
			}

			return data;
		},
		onSuccess: () => {
			setNewTodo("");
			queryClient.invalidateQueries({ queryKey: ["todos"] });
			inputRef.current?.focus();
		},
		onError: (error) => {
			alert(error.message);
		},
	});

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				if (!newTodo.trim()) return;
				createTodo();
			}}
		>
			<Flex gap={2}>
				<Input
					ref={inputRef}
					type="text"
					placeholder="Add a task..."
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					isDisabled={isCreating}
				/>

				<Button
					type="submit"
					isDisabled={!newTodo.trim() || isCreating}
					_active={{ transform: "scale(.97)" }}
				>
					{isCreating ? <Spinner size="xs" /> : <IoMdAdd size={28} />}
				</Button>
			</Flex>
		</form>
	);
};

export default TodoForm;
