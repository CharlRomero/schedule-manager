import { useDraggable } from "@dnd-kit/core";

export const Draggable = ({ id, children }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
  });
  
  return (
    <button ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </button>
  );
};
