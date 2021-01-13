import React, { useState, useEffect, createContext } from 'react';
import styled from 'styled-components';
import Card from './Card';
import Container from './Container';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export const ContainerStyle = styled.div`
    background: green;
    display: flex;

   
`
export const ListStyle = styled.div`
    background: green;
    max-height:100%;
    overflow-y:auto;
    display: flex;
    flex-direction: column;
    margin: 40px;

    .listHeader {
        margin: 5px;
    }

    .listSearch {
        margin: 5px;
    }

    .list {
        background: #c7c3ea;
        margin: 5px;
        overflow-y:auto;
        height:400px;
    }

    .listCard{
        border: 1px solid;
        padding: 5px;
        margin: 5px;
        background: grey;
        font-weight: bold;
        color: white;

    }
   
`

export const CardContext = createContext({
    handleDrop: null
});

const ListDragAndDrop = ({options, selected, onChange, onClick}) => {
    const [selectedList, setSelectedList] = useState([]);

    const [optionSearch, setOptionSearch] = useState("");
    const [selectedSearch, setSelectedSearch] = useState("");

    useEffect(() => {
        selected && setSelectedList(selected);
    }, [selected]);

    const handleSelect = id => {
        let index = selectedList.findIndex(x => x === id);
        if (index > 0) return;
        let s = [...selectedList];
        s.push(id);
        setSelectedList(s);

        onChange(s);
	};
    
    const handleDeSelect = id => {
        let s = selectedList.filter(e => e !== id)
        setSelectedList(s);

        onChange(s);
    };

    const handleDrop = (type, id) =>{
        if (type === "options"){
            handleDeSelect(id);
        }else{
            handleSelect(id);
        }
    }

    const handleOnClick = (id) =>{
        onClick && onClick(id);
    }
    
    return (
    <DndProvider backend={HTML5Backend}>
        <CardContext.Provider value={{ handleDrop, handleOnClick }}>
            <ContainerStyle>
                <ListStyle>
                    <h3 className="listHeader">Selected</h3>
                    <div className="listSearch">
                        <input
                            type="text"
                            value={selectedSearch}
                            onChange={(e) => {setSelectedSearch(e.target.value)}}
                        />
                    </div>
                    <div className="list">
                    <Container className="list" type = "selected">
                        {selectedList
                                    .filter(x => 
                                        options
                                        .filter(x=>x.label.toUpperCase().includes(selectedSearch.toUpperCase()))
                                        .map(a => a.value).includes(x))
                                    .map((value) => {
                                    let option = options.find(x => x.value === value)
                                return(
                                    <div className="listCard">
                                        <Card text={option.label} 
                                        isAvailable = {option.isAvailable} 
                                        id={value}
                                        onClick = {onClick}/>
                                    </div>);
                            })
                        }
                    </Container>
                    </div>
                </ListStyle>
                <ListStyle>
                    <h3 className="listHeader">All</h3>
                    <div className="listSearch">
                        <input
                            type="text"
                            value={optionSearch}
                            onChange={(e) => {setOptionSearch(e.target.value)}}
                        />
                    </div>
                    <div className="list">
                    <Container className="list" type ="options">
                            {options
                                .filter(x => x.label.toUpperCase().includes(optionSearch.toUpperCase()))
                                .filter(x=>!selectedList.includes(x.value))
                                .map((v) => {
                                     return(
                                     <div className="listCard">
                                        <Card text={v.label}
                                         isAvailable = {v.isAvailable} 
                                         id={v.value}
                                         onClick = {onClick}/>
                                     </div>);
                            })}
                    </Container>
                    </div>
                </ListStyle>
            </ContainerStyle>
        </CardContext.Provider>
    </DndProvider>);
};

export default ListDragAndDrop;
