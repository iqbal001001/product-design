import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateFeature, saveFeature } from "../Store/Feature/feature";
import styled from 'styled-components';
import _ from 'lodash'; 
import { AwesomeButton } from "react-awesome-button";
import Select from 'react-select'
import { FeatureService } from "../Service/FeatureService";
import { ClinicalCategoryService } from "../Service/ClinicalCategory";
import FeatureItemDetail from './FeatureItemDetail';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const SuiteStyle = styled.div`
    background: grey;
    max-height:100%;
    overflow-y:auto;
`
export const SuiteDetailStyle = styled.div`
    background: grey;
    display: flex;
    height: 200px;
    flex-direction: column;

    .row1 {
      display: flex;
    }

    .row2 {
      display: flex;
      justify-content: space-between;
    }
`

export const VersionsStyle = styled.div`
    background: yellow;
    max-height:100%;
    display: flex;
    flex-direction: column;
`

export const InputBlockStyle = styled.div`
    
    max-height:100%;
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

const InputBlock = ({children}) => {
  return (<InputBlockStyle>{children}</InputBlockStyle> );
}


const FeatureEdit = ({selected, originalSelected, onChange, onSave}) => {
  const featureSrv = new FeatureService();
  const clinicalCategorySrv = new ClinicalCategoryService();

  //const feature = useSelector(state => state.entities.feature);
  //const originalFeature = useSelector(state => state.entities.originalFeature);
  const [feature, setFeature] = useState(null);
  const [groups, setGroups] = useState([]);
   const [types, setTypes] = useState([]);
  const [clincalCategories, setClincalCategories] = useState([]);
  //const [isDirtyFeature, setIsDirtyFeature] = useState(false);

  useEffect( () => {
    loadClinicalCategories();
    loadGroups();
    loadTypes();
   }, []);

   useEffect( () => {
    selected && setFeature(selected);
 }, [selected]);

  //  useEffect( () => {
  //   if (selected){
  //     setFeature(selected);
  //     setOriginalFeature(selected);
  //   }
  //  }, [selected]);

useEffect( () =>{
 // handleIsDirtyFeature()
 feature && onChange && onChange(feature);
},[feature]);


// useEffect( () =>{
//   handleIsDirtyFeature()
// },[originalFeature]);


// const handleIsDirtyFeature = () =>{
//   let isDirtTemplate = !_.isEqual(feature, originalFeature);

//  setIsDirtyFeature(isDirtTemplate);
// }

  const loadClinicalCategories = async() => {
    let cCs = await clinicalCategorySrv.getClinicalCategories();
     
    setClincalCategories(cCs);
  }

  const loadGroups = async() => {
    let cCs = await featureSrv.getGroups();
     
    setGroups(cCs);
  }

  const loadTypes = async() => {
    let cCs = await featureSrv.getTypes();
     
    setTypes(cCs);
  }

  const setFeid = ({target}) => {
    setFeature({...feature, [target.name]: target.value});
  };

  //  const updateDescription = (value) => {
  //   setTimeout(function() {
  //     let f = {...feature, Description : value}
  //     dispatch(updateFeature(f));
  //  }, 2000);
  //  }

  //  const updateName = (value) => {
  //   setTimeout(function() {
  //   let f = {...feature, Name : value}
  //   dispatch(updateFeature(f));
  // }, 2000);
  // }

  const updateClinicalCategory = (value) => {
    // let f = {...feature, ClinicalCategoryId : value.Id}
    // dispatch(updateFeature(f));
    setFeature({...feature, ClinicalCategoryId : value.Id});
  }

  const updateGroup = (value) => {
    setFeature({...feature, GroupId : value.Id});
  }

  const updateType = (value) => {
    setFeature({...feature, TypeId : value.Id});
  }


  const Save = async() => {
    // let f = await onSave(feature);
 
    // setFeature(f);
    // setOriginalFeature(f);
   // dispatch(saveFeature(feature));
   onSave && await onSave(feature)
    }

  const onItemChange = (items) => {
    console.log(items)
           let f = _.cloneDeep(feature);
           f.Items = items
           setFeature(f);
         //  dispatch(updateFeature(f));
  }

  return (
    <React.Fragment> 
      <Container>
        <h1>Feature Edit</h1>
        <Suite>
          <h1>CFeature - {feature?.Name}</h1>
         <SuiteDetail>
           <div className="row1">
         <InputBlock>
              <span>Name</span>
              <input
                type="text"
                value={feature?.Name}
                name= "Name"
                onChange={setFeid}
              />
            </InputBlock>
          <InputBlock>
              <span>Description</span>
              <input
                type="text"
                value={feature?.Description}
                name ="Description"
                onChange={setFeid}
              />
            </InputBlock>
            </div>
            <div className="row2">
            <InputBlock>
              <span>Clinical Category {feature?.ClinicalCategoryId}</span>
              <Select    
                options={clincalCategories}
                value={clincalCategories?.find(x => x.Id === feature?.ClinicalCategoryId)?? []}
                getOptionLabel={ x => x.Code + ' - ' +  x.Name}
                getOptionValue={ x => x.Id}
                onChange={e => updateClinicalCategory(e)}
                />
            </InputBlock>
            <InputBlock>
              <span>Type{feature?.TypeId}</span>
              <Select    
                options={types}
                value={types?.find(x => x.Id === feature?.TypeId)?? []}
                getOptionLabel={ x => x.Name}
                getOptionValue={ x => x.Id}
                onChange={e => updateType(e)}
                />
            </InputBlock>
            <InputBlock>
              <span>Group{feature?.GroupId}</span>
              <Select    
                options={groups}
                value={groups?.find(x => x.Id === feature?.GroupId)?? []}
                getOptionLabel={ x => x.Name}
                getOptionValue={ x => x.Id}
                onChange={e => updateGroup(e)}
                />
            </InputBlock>
            </div>
         </SuiteDetail>
         { onSave && <AwesomeButton
                  type="primary"
                  ripple
                  onPress={() => {
                    Save();
                  }}
                  >
                  {feature?.Id > 0 ? "Save" : "Create"}
              </AwesomeButton>
              }
        </Suite>
        <Versions>
        <FeatureItemDetail selected = {feature} onChange = {onItemChange}/>
        </Versions>
      </Container>
    </React.Fragment>
  );
};

export default FeatureEdit;

