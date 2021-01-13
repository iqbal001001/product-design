import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';
import _ from 'lodash'; 
import Moment from 'react-moment';
import { AwesomeButton } from "react-awesome-button";
import Modal from "./Model";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const VersionsStyle = styled.div`
    background: yellow;
    max-height:100%;
    overflow-y:auto;
    display: flex;
`

export const VersionListStyle = styled.div`
    background: yellow;
    max-height:100%;
    overflow-y:auto;
`

const Versions = ({children}) => {
  return (<VersionsStyle>{children}</VersionsStyle> );
}

const VersionList = ({children}) => {
  return (<VersionListStyle>{children}</VersionListStyle> );
}

const ClinicalCategoryVersions = ({selectedId, selectedItems, onSave, detailComponent}) => {

  const [versions, setVersions] = useState([]);
  const [version, setVersion] = useState(null);
  const [newVersion, setNewVersion] = useState({});
  const [cloneVersion, setCloneVersion] = useState({});

  const modalRefNewClinicalItem = React.useRef();
  const modalRefCloneClinicalItem = React.useRef();
  
     const openModalNewClinicalItem = () => {
      getNewVersion();
      modalRefNewClinicalItem.current.openModal()
      //  GetAllTemplate();
    };

    const closeModalNewClinicalItem = () => {
      modalRefNewClinicalItem.current.close()
    };

    const openModalCloneClinicalItem = () => {
      getCloneVersion();
      modalRefCloneClinicalItem.current.openModal()
    };

    const closeModalCloneClinicalItem = () => {
      modalRefCloneClinicalItem.current.close()
    };

   useEffect( () => {
     if(selectedItems){
    let groups = getClinicalItemsByGroup(_.cloneDeep(selectedItems));
          setVersions(groups);
        let k = Object.keys(groups);
     }
   }, [selectedItems]);

   useEffect( () => {
    if (version){
     let startAndEndDate = version.UniqueId.substring(0,version.UniqueId.lastIndexOf('|'))
     let newUniqueId = startAndEndDate + '|' + selectedId
     if (versions[newUniqueId]){
      let v = { UniqueId: newUniqueId, values: versions[newUniqueId]}
      setVersion(v);
     }
    }
   }, [versions]);



   const getClinicalItemsByGroup =(cls) =>{
     if (cls.length === 0) return {};
    cls.forEach(function (element) {
      element.UniqueId = element.StartDate + '|' + element.EndDate + '|' + selectedId;
    });

 let groups =  _.groupBy(cls, cl => cl.UniqueId);//_.mapValues(_.groupBy(cc[0].ClinicalItems, 'StartDate'));
return groups
   }

   const selectVersion = (sUniqueId) => {
       let v = { UniqueId: sUniqueId, values: versions[sUniqueId]}
    setVersion(v);
     console.log(v);
   }

   const onVersionSave = (v) => {

    let cIs = v.values;
     //let cC = _.cloneDeep(clinicalCategory);

    let group = getClinicalItemsByGroup(cIs);
    let groupKey = Object.keys(group)[0];
    let vs = _.cloneDeep(versions);

    if(cIs.length === 0){
      vs = omit(vs,[v.UniqueId]);
      setVersion(null);
    }else{ 
      if (Object.keys(vs).includes(groupKey)){
        vs[groupKey] = group[groupKey]
        let v = { UniqueId: groupKey, values: group[groupKey]}
        setVersion(v);
      }else{
        Object.assign(vs, group);
    }
  }
    setVersions(vs);

    let newItems = [].concat.apply([], Object.values(vs));
    onSave(newItems);
    // cC.ClinicalItems = [].concat.apply([], Object.values(vs));
    //  setClinicalCategory(cC);
   }

   const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

   const getNewVersion = () => {
    setNewVersion( {
      UniqueId: new Date().toLocaleDateString() + '|' + new Date().toLocaleDateString() + '|' + selectedId,
      values : []
    });
  }

   const getCloneVersion = () => {
    let v = _.cloneDeep(version);
    v.values.map((cI) => {
     cI.Id = 0
    })
     setCloneVersion(v);
   }

  return (
    <React.Fragment> 
      <Container>
        <Versions>
          <VersionList>
         {true && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    openModalNewClinicalItem();
                  }}
                  >
                  New
              </AwesomeButton>
              }
              {true &&
              <Modal ref={modalRefNewClinicalItem}>
                    <h1>Create New Clinical Item</h1>
                       { React.cloneElement(detailComponent, 
                        { mode : "new" ,
                        allAllocatedItems : selectedItems,
                        selected : newVersion ,
                        onSave : onVersionSave
                        })
                      }
                    <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        closeModalNewClinicalItem();
                    }}
                    >
                    Close
                </AwesomeButton>
                </Modal>
              }
              {false && version &&
                <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    openModalCloneClinicalItem();
                  }}
                  >
                  Clone
              </AwesomeButton>
}
{false && version &&
              <Modal ref={modalRefCloneClinicalItem}>
                    <h1>Create Clone Clinical Item</h1>
                      { React.cloneElement(detailComponent, 
                        { mode : "clone" ,
                        allAllocatedItems : selectedItems,
                        selected : cloneVersion ,
                        onSave : onVersionSave
                        })
                      }
                    <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        closeModalCloneClinicalItem();
                    }}
                    >
                    Close
                </AwesomeButton>
                </Modal>
}
          <ListGroup as="ul">
            {versions && 
              Object.keys(versions).map((k, i) => {
              return <ListGroup.Item as="li" key={i} 
                                onClick = {() => {selectVersion(k)}} 
                                active = {k === version?.UniqueId} >
                        <Moment format="YYYY/MM/DD" date ={k.split('|')[0]}/> - 
                        <Moment format="YYYY/MM/DD" date ={k.split('|')[1]}/>
                      </ListGroup.Item>;
              })
            }
				  </ListGroup>    
          </VersionList>
          {version &&
          React.cloneElement(detailComponent, 
              { mode : "detail" ,
              allAllocatedItems : selectedItems,
              selected : version ,
              onSave : onVersionSave
               })
          

          }

        </Versions>
      </Container>
    </React.Fragment>
  );
};

export default ClinicalCategoryVersions;

