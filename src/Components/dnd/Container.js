import React, { useContext } from 'react';

import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { CardContext } from './ListDragAndDrop';

const Container = ({type, children}) => {
    const { handleDrop } = useContext(CardContext);

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.Card,
        canDrop: (item, monitor) => { 
            return   item.isAvailable
        },
        drop: (item, monitor) => handleDrop(type, item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
          
        }),
    });

    const isAvailable = (item) => {
        return   item.isAvailable
    }

    return (<div ref={drop} style={{
        width: '100%',
        height: '100%',
        background: isOver? 'grey' : ''
    }}>
			{children}
		</div>);
};

export default Container;
