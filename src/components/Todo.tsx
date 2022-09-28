import styles from './Todo.module.css';
import todoStyles from './TodoContent.module.css'
import clipBoard from '../image/clipboard.svg';
import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 } from 'uuid';

interface TaskList {
    id: string;
    title: string;
    isCompleted: boolean;
}

export function Todo() {

    const [tarefas, setTarefas] = useState<TaskList[]>([])

    const [newTodoItem, setNewTodoItem] = useState('')

    const [totalCriada, setTotalCriada] = useState(0)

    const [totalConcluida, setTotalConcluida] = useState(0)

    function handleCreateItem(event: FormEvent) {
        event.preventDefault()

        const task = {
            id: v4(),
            title: newTodoItem,
            isCompleted: false
        }

        setTarefas([...tarefas, task])

        setTotalCriada(tarefas.length + 1)

        setNewTodoItem('')
    }

    function handleNewTodoItemChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('')
        setNewTodoItem(event.target.value);
    }

    function handleNewTodoItemInvalid(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório')
    }

    function deleteItemTodo(id: string) {
        const removeOneTodo = tarefas.filter(item => {
            return item.id !== id
        })

        setTotalCriada(removeOneTodo.length)
        setTarefas(removeOneTodo)
    }

    function handleTaskIsCompleted(id: string){
        const isCompleted = tarefas.map(task => task.id === id ? {
            ...task, 
            isCompleted: !task.isCompleted
        }: task)

        setTarefas(isCompleted)

        const totalCompleted = isCompleted.reduce((total, item) => {
            if(item.isCompleted === true){
                total++
            }

            return total
        }, 0)  
        
        setTotalConcluida(totalCompleted)
    }

    const todoInputEmpty = newTodoItem.length === 0

    return (
        <div className={styles.todoContainer}>
            <form onSubmit={handleCreateItem}>
                <input className={styles.inputForm}
                    name="itemList"
                    type="text"
                    value={newTodoItem}
                    placeholder="Adicione uma nova tarefa"
                    onChange={handleNewTodoItemChange}
                    onInvalid={handleNewTodoItemInvalid}
                    required
                />
                <button type="submit" className={styles.buttonSubmit} disabled={todoInputEmpty}>
                    Criar
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1105_11)">
                            <path d="M7.98373 1.45158C9.27565 1.45158 10.5386 1.83468 11.6128 2.55244C12.687 3.27019 13.5242 4.29037 14.0186 5.48395C14.513 6.67754 14.6424 7.99092 14.3903 9.25802C14.1383 10.5251 13.5161 11.689 12.6026 12.6026C11.6891 13.5161 10.5252 14.1382 9.25807 14.3903C7.99097 14.6423 6.67759 14.5129 5.484 14.0185C4.29042 13.5241 3.27025 12.6869 2.55249 11.6127C1.83473 10.5385 1.45163 9.2756 1.45163 7.98368C1.45832 6.25332 2.14867 4.59574 3.37223 3.37218C4.59579 2.14862 6.25337 1.45827 7.98373 1.45158ZM7.98373 5.77648e-06C6.40611 0.00645971 4.86578 0.480174 3.55717 1.36134C2.24857 2.24252 1.23037 3.49164 0.631106 4.95102C0.031846 6.4104 -0.121605 8.01461 0.190125 9.56114C0.501855 11.1077 1.26479 12.5272 2.38262 13.6404C3.50044 14.7537 4.92304 15.5108 6.47082 15.8162C8.01861 16.1217 9.62218 15.9617 11.0791 15.3564C12.536 14.7512 13.781 13.7279 14.6568 12.4158C15.5326 11.1036 16 9.5613 16.0001 7.98368C16.0001 6.93249 15.7925 5.89165 15.3892 4.92089C14.986 3.95014 14.395 3.06857 13.6502 2.32679C12.9053 1.58501 12.0214 0.997618 11.049 0.598327C10.0766 0.199035 9.0349 -0.00429452 7.98373 5.77648e-06Z" fill="#F2F2F2" />
                            <path d="M11.707 7.38127H8.4954V4.16966H7.41397V7.38127H4.19873V8.4627H7.41397V11.6743H8.4954V8.4627H11.707V7.38127Z" fill="#F2F2F2" />
                        </g>
                    </svg>
                </button>
            </form>

            <div className={styles.todoListWrapper}>
                <header>
                    <p>Tarefas criadas <span>{totalCriada}</span></p>
                    <p>Concluidas <span>{totalConcluida} de {totalCriada}</span></p>
                </header>

                <div className={styles.todoListWrapperContent}>

                    {tarefas.length > 0 ? tarefas.map(task => (
                        <div className={todoStyles.todoContentWrapper} key={task.id}>
                            <div className={todoStyles.todoItem}>
                                <input type="checkbox" name="tarefa"
                                    onClick={() => handleTaskIsCompleted(task.id)}
                                    defaultChecked={task.isCompleted}
                                />

                                <label htmlFor="tarefa">
                                    {task.title}
                                </label>
                            </div>
                            <button type="button" onClick={() => deleteItemTodo(task.id)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.2021 9.98548H12.8716V15.5073H14.2021V9.98548Z" fill="#808080" />
                                    <path d="M11.4624 9.98548H10.1318V15.5073H11.4624V9.98548Z" fill="#808080" />
                                    <path d="M18.478 7.16712C18.4754 7.03061 18.4295 6.89846 18.3469 6.78975C18.2642 6.68104 18.1492 6.6014 18.0184 6.56232C17.9596 6.53782 17.8974 6.52252 17.8339 6.51696H14.2868C14.1525 6.07791 13.8808 5.69355 13.5117 5.42047C13.1426 5.14739 12.6956 5 12.2365 5C11.7774 5 11.3304 5.14739 10.9613 5.42047C10.5922 5.69355 10.3205 6.07791 10.1862 6.51696H6.63911C6.58068 6.51814 6.52269 6.52729 6.46674 6.54418H6.45162C6.31318 6.58701 6.19334 6.67547 6.11163 6.79515C6.02992 6.91483 5.99117 7.05866 6.00169 7.20319C6.01222 7.34771 6.0714 7.48441 6.16958 7.59099C6.26776 7.69757 6.39916 7.76774 6.54234 7.79006L7.25298 17.5334C7.26382 17.9127 7.41693 18.2741 7.68191 18.5458C7.94688 18.8175 8.30435 18.9797 8.68332 19H15.7867C16.1662 18.9804 16.5244 18.8186 16.79 18.5468C17.0556 18.2751 17.2092 17.9132 17.22 17.5334L17.9277 7.79914C18.0802 7.77797 18.22 7.70232 18.3212 7.58615C18.4223 7.46999 18.478 7.32116 18.478 7.16712ZM12.2365 6.21456C12.3661 6.21458 12.4943 6.24146 12.6129 6.29351C12.7316 6.34556 12.8382 6.42164 12.926 6.51696H11.547C11.6346 6.42135 11.7411 6.34507 11.8599 6.29299C11.9786 6.24092 12.1069 6.21421 12.2365 6.21456ZM15.7867 17.7904H8.68332C8.60168 17.7904 8.47467 17.6573 8.45955 17.4457L7.75798 7.81123H16.715L16.0135 17.4457C15.9984 17.6573 15.8714 17.7904 15.7867 17.7904Z" fill="#808080" />
                                </svg>
                            </button>
                        </div>
                    )) : (
                        <div className={styles.todoListNotContent}>
                            <img src={clipBoard} />
                            <p>
                                Você ainda não tem tarefas cadastradas
                                <span>Crie tarefas e organize seus itens a fazer</span>
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}