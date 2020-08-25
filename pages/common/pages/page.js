
import React from 'react';



export default class Page extends React.Component{
  //static _layoutName = 'pageLayout';
  constructor(props) {
    super(props);
  }
  
  static setLayoutName(name){
    if (name){
      //this._layoutName = name;
    }  
  }
  
  
}
