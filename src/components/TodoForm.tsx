import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type React from "react";
import { useState, useEffect } from "react";
import { addTodo, updateTodo } from "../firebase/db";
import { toast } from "react-toastify";
import type { DataTodo } from "@myTypes/todoType";

type Props = {
    onClose?: () => void;
    onAdded?: () => void;
    todoToEdit?: DataTodo; // Nếu có là sửa
};

const TodoForm: React.FC<Props> = ({ onClose, onAdded, todoToEdit }) => {
    const [title, setTitle] = useState("");
    const [dueDay, setDueDay] = useState("");

    // Khi form mở với todoToEdit thì điền sẵn dữ liệu
    useEffect(() => {
        if (todoToEdit) {
            setTitle(todoToEdit.title);
            // Chuyển timestamp Firebase -> yyyy-mm-dd cho input type=date
            setDueDay(todoToEdit.dueDay?.toDate
                ? todoToEdit.dueDay.toDate().toISOString().slice(0, 10)
                : "");
        } else {
            setTitle("");
            setDueDay("");
        }
    }, [todoToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !dueDay) return alert("Vui lòng nhập đầy đủ thông tin!");

        try {
            if (todoToEdit) {
                // Sửa todo
                await updateTodo(todoToEdit.id, { title, dueDay: new Date(dueDay) });
                toast.success("Cập nhật công việc thành công!");
            } else {
                // Thêm todo mới
                await addTodo({ title, completed: false, dueDay: new Date(dueDay) });
                toast.success("Thêm công việc thành công!");
            }
            onAdded?.();
            onClose?.();
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra, thử lại!");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center fadeUp">
            <div className="w-[400px] bg-blue-100 relative text-neutral-900 rounded-lg p-5 shadow-lg select-none">
                {/* Nút đóng */}
                <FontAwesomeIcon
                    icon={faX}
                    onClick={onClose}
                    className="absolute right-2 top-2 p-1 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-300 cursor-pointer"
                />

                <h1 className="font-bold text-xl text-center mb-4">
                    {todoToEdit ? "EDIT TODO" : "ADD TODO"}
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="font-semibold">Tiêu đề:</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Nhập tiêu đề công việc..."
                            className="border border-blue-300 rounded-md px-2 py-1 outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Ngày đến hạn:</label>
                        <input
                            value={dueDay}
                            onChange={(e) => setDueDay(e.target.value)}
                            type="date"
                            className="border border-blue-300 rounded-md px-2 py-1 outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-1 bg-gray-300 rounded-md hover:bg-red-500/90 hover:text-white transition-all cursor-pointer"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all cursor-pointer"
                        >
                            {todoToEdit ? "Cập nhật" : "Lưu"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TodoForm;
