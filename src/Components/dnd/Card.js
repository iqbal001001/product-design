import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { CardContext } from './ListDragAndDrop';

const Card = ({text, isAvailable, id, onClick}) => {
    const { handleOnClick } = useContext(CardContext);
    const [{ isDragging }, drag] = useDrag({
        item: { 
            type: ItemTypes.Card,
            id: id,
            isAvailable: isAvailable
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (<>
			<div ref={drag} style={{
        opacity: isDragging ? 0.5 : 1,}} onClick={() => handleOnClick(id)}>{text}
			</div>
		</>);
};

export default Card;
