import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';
import _ from 'lodash'; 
import Moment from 'react-moment';
import { AwesomeButton } from "react-awesome-button";
import Select from 'react-select'
import Modal from "./Model";
import VersionDetail from "./VersionDetail";
import  { ProductService } from "../Service/ProductService";
import uuid from 'react-uuid';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const SuiteStyle = styled.div`
    
    max-height:100%;
    overflow-y:auto;
`
export const SuiteDetailStyle = styled.div`
    background: grey;
    display: flex;
    height: 250px;
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

export const InputBlockStyle = styled.div`
    background: grey;
    max-height:100%;
    overflow-y:auto;
    width: 300px;
`

const Suite = ({children}) => {
    return (<SuiteStyle>{children}</SuiteStyle> );
}

const SuiteDetail = ({children}) => {
  return (<SuiteDetailStyle>{children}</SuiteDetailStyle> );
}

const Versions = ({children}) => {
  return (<VersionsStyle>{children}</VersionsStyle> );
}

const VersionList = ({children}) => {
  return (<VersionListStyle>{children}</VersionListStyle> );
}

const InputBlock = ({children}) => {
  return (<InputBlockStyle>{children}</InputBlockStyle> );
}


const ProductEdit = ({selected, originalSelected, onChange, onSave}) => {
  //const dispatch = useDispatch();
  const productSrv = new ProductService();

  const [suite, setSuite] = useState(null);
  //const [originalSuite, setOriginalSuite] = useState(productSrv.getNewSuite());
  // const suite = useSelector(state => state.entities.suite);
  // const originalSuite = useSelector(state => state.entities.originalSuite);
  const [version, setVersion] = useState(null);
 // const version = useSelector(state => state.entities.version);
  const [categories, setCategories] = useState([]);
 // const [isDirtySuite, setIsDirtySuite] = useState(false);

  const modalRefNewVersion = React.useRef();
  const modalRefCloneVersion = React.useRef();
  
     const openModalNewVersion = () => {
       if (suite){
          setVersion({...productSrv.getNewVersion(suite.Id), Mode:'new'});
          modalRefNewVersion.current.openModal();
       }
    };

    const closeModalNewVersion = () => {
      modalRefNewVersion.current.close()
    };

    const saveModalNewVersion = () => {
      //setVersion({...version, Mode:''});
      updateVersion({...version});
      modalRefNewVersion.current.close()
    };

    const openModalCloneVersion = () => {
      if (version && !_.isEmpty(version)){
        modalRefCloneVersion.current.openModal()
      }
    };

    const closeModalCloneVersion = () => {
      modalRefCloneVersion.current.close()
    };

    const saveModalCloneVersion = () => {
      //setVersion({...version, Mode:''});
      updateVersion({...version, Id: 0, UniqueId: uuid().toString()});
      modalRefCloneVersion.current.close()
    };

    useEffect( () => {
      loadCategories()
     }, []);
    
  useEffect( () => {
      selected && setSuite(selected);
   }, [selected]);

  //  useEffect( () => {
  //     originalSelected && setOriginalSuite(originalSelected);
  //  }, [originalSelected]);

   useEffect( () =>{
     if (version && !_.isEmpty(version)){
      let v = suite.Versions.find( ({ Id }) => Id === version.Id)
       setVersion(v?? null);
      //  if (v && !_.isEqual(v,version))
      //    dispatch(versionAction.updateVersion(v?? {}));
     }
   // handleIsDirtySuite()
   suite && onChange && onChange(suite);
  },[suite]);
  
  
  // useEffect( () =>{
  //   handleIsDirtySuite()
  // },[originalSuite]);
  
  
  // const handleIsDirtySuite = () =>{
  //   let isDirtTemplate = !_.isEqual(suite, originalSuite);
  
  //  setIsDirtySuite(isDirtTemplate);
  // }


   const loadCategories = async() => {
    let cs = await productSrv.getProductCategories();
     
    setCategories(cs);
  }

  //  const updateName = (value) => {
  //   let s = {...suite, Name : value}
  //   setSuite(s);
  // }

  const updateCategory = (value) => {
    setSuite({...suite, CategoryId : value.Id});
  }

  const setFeid = ({target}) => {
    setSuite({...suite, [target.name]: target.value});
  };


   const selectVersion = (version) => {
    setVersion(version);
    //dispatch(versionAction.updateVersion(version))
     console.log(version);
   }

  //  const onVersionSave = (version, savedToDB, mode) => {
  //    let s = _.cloneDeep(suite);
  //    let oS = _.cloneDeep(originalSuite);

  //   let suite = updateVersion(s,version);
  //   let originalSuite = updateVersion(oS,version);
  //   dispatch(updateSuite(suite));
  //   if (savedToDB) dispatch(updateOriginalSuite(originalSuite));
  //  }

  //  const updateVersion = (s,version) =>{
  //   let index = s.Versions.findIndex( ({ UniqueId }) => UniqueId === version.UniqueId);
  //   if (index > -1){
  //     s.Versions[index] = version;
  //   }else
  //   {
  //     s.Versions.push(version);
  //   }
  //   return s;
  //  }

  const updateVersion = (version) =>{
    let s = _.cloneDeep(suite);
   let index = s.Versions.findIndex( ({ UniqueId }) => UniqueId === version.UniqueId);
   if (index > -1){
     s.Versions[index] = version;
   }else
   {
     s.Versions.push(version);
   }
   setSuite(s);
  }

  const removeVersion = (UniqueId) => {
    let s = _.cloneDeep(suite);
    let index = s.Versions.findIndex( ({ UniqueId }) => UniqueId === version.UniqueId);
    if (index > -1){
      s.Versions.splice(index, 1);
    }
    setSuite(s);
  }

   const SaveSuite = async() => {
    console.log(suite)
   // let s = await onSave(suite);
    onSave && await onSave(suite)
   
   // console.log(s);
    // dispatch(updateSuite(s));
    // dispatch(updateOriginalSuite(s));
   }

   const onVersionChange = (v) => {

   (!_.isEqual(version,v)) && setVersion(v);
   }

   const onVersionDetailChange = (v) => {

    (!_.isEqual(version,v)) && setVersion(v) ;
    (!_.isEqual(version,v)) && updateVersion(v);
    }

  return (
    <React.Fragment> 
      <Container>
        <h1>Product Edit</h1>
        <Suite>
        <h1>Product Suite - {suite?.Id}</h1>
         <SuiteDetail>
          <InputBlock>
              <span>Name</span>
              <input
                type="text"
                value={suite?.Name}
                name="Name"
                onChange={setFeid}
              />
            </InputBlock>
            <InputBlock>
              <span>Category {suite?.CategoryId}</span>
              <Select    
                options={categories}
                value={categories?.find(x => x.Id === suite?.CategoryId)?? []}
                getOptionLabel={ x => x.Name}
                getOptionValue={ x => x.Id}
                name="CategoryId"
                onChange={updateCategory}
                />
            </InputBlock>
         </SuiteDetail>
         {onSave && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    SaveSuite();
                  }}
                  >
                  {suite?.Id > 0 ? "Save" : "Create"}
        </AwesomeButton>}
        </Suite>
        <Versions>
          <VersionList>
          <h1>Version list</h1>
         {suite && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    openModalNewVersion();
                  }}
                  >
                  New
              </AwesomeButton>
              }
              {suite &&
              <Modal ref={modalRefNewVersion}>
                    <h1>Create New Version</h1>
                        
                    <VersionDetail 
                      mode="new" 
                      selected={version}
                      onChange={onVersionChange}
                      />
                    <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        closeModalNewVersion();
                    }}
                    >
                    Close
                </AwesomeButton>
                <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        saveModalNewVersion();
                    }}
                    >
                    save
                </AwesomeButton>
                </Modal>
              }
              {version && suite.Versions.length > 0 &&
                <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    openModalCloneVersion();
                  }}
                  >
                  Clone
              </AwesomeButton>
}
{version && suite.Versions.length > 0 &&
              <Modal ref={modalRefCloneVersion}>
                    <h1>Create Clone Version</h1>
                        
                    <VersionDetail
                     selected={version}
                     mode="clone"  
                     onChange={onVersionChange}
                     />
                    <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        closeModalCloneVersion();
                    }}
                    >
                    Close
                </AwesomeButton>
                <AwesomeButton
                    type="primary"
                    ripple
                    onPress={() => {
                        saveModalCloneVersion();
                    }}
                    >
                    Save
                </AwesomeButton>
                </Modal>
}
          <ListGroup as="ul">
            {suite?.Versions && 
              suite.Versions.map((v, i) => {
              return (
                <>
                <ListGroup.Item as="li" key={i} onClick = {() => {selectVersion(v)}} active = {v.UniqueId === version?.UniqueId} >
                        <Moment format="YYYY/MM/DD" date ={v.StartDate}/> - <Moment format="YYYY/MM/DD" date ={v.EndDate}/>
                        <AwesomeButton
                        type="primary"
                        ripple
                        onPress={() => {
                          removeVersion(v.UniqueId);
                        }}
                        >
                        X
                    </AwesomeButton>
                      </ListGroup.Item>
                </>);
              })
            }
				  </ListGroup>    
          </VersionList>
          {version && suite.Versions.length > 0 &&
             <VersionDetail mode="detail" selected={version} onChange={onVersionDetailChange}/>
          }
        </Versions>
      </Container>
    </React.Fragment>
  );
};

export default ProductEdit;

