import React,{Component} from 'react';
import {View,Text,Container, Header, Content, Form, Item, Input, Label,Button} from 'native-base';

class App extends Component{

  state = {
    apidata:[{dataId:null,name:null,email:null,phone:null}],
  nadata:[{dataId:null,name:null,email:null,phone:null}] 
  }
  getButton=()=>{
    fetch('http://192.168.1.106:9090/main',{
      method: 'GET'
    }).then((responseData)=>{
      
    return responseData.json()
           
    }).then((jsonData)=>{
      
      console.log(jsonData)
      this.setState({apidata:jsonData})
      console.log(this.state.apidata)
             
      }).done();
      this.dataId = null
  }
    
  saveButton = () =>{
    fetch('http://192.168.1.106:9090/main',{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name:this.name,email:this.email,phone:this.phone})
    }).then((responseData)=>{
      
    return responseData.json();
           
    }).then((jsonData)=>{
      
      //console.log(jsonData)
      this.setState({nadata:jsonData})
      console.log(this.state.nadata)
             
      }).done();
      this.dataId = null;
      this.name = null;
      this.email = null;
      this.phone= null;
  }

  searchButton=()=>{
    fetch('http://192.168.1.106:9090/main/'+(this.dataId),{
      method:'GET'
     
    }).then((responseData)=>{
      
    return responseData.json();
           
    }).then((jsonData)=>{
      // if (jsonData.success === true){
      //   alert('great')
      console.log(jsonData)
      this.setState({apidata:jsonData})
      alert('data fetched')
 
      //}
      // else{
      //   alert(jsonData.responseData)
      // }
      })
      .done();
      this.dataId = null

  }

  
  deleteButton=()=>{
    fetch('http://192.168.1.106:9090/main'+(this.dataId),{
      method: 'DELETE'
    }).then((responseData)=>{ 
    console.log(responseData.rows);
      }).done();
      this.dataId = null
    }




    updateButton = () =>{
      fetch('http://192.168.1.106:9090/main/',{
        method: 'PUT',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({name:this.name,email:this.email,phone:this.phone})
      }).then((responseData)=>{ 
      return responseData.json();          
        }).done();
        this.dataId = null
        this.name = null
        this.email = null
        this.phone= null
    }


  render(){
    const data = this.state.apidata;
    let dataDisplay = data.map(function(jsonData){
      return ( 
        <View key={jsonData.id}>
        <Text>{jsonData.id}   {jsonData.name}    {jsonData.email}   {jsonData.phone}</Text>
        </View>
      )
    });
    return(
      <Container>
      <Header />
      <Content>
        <Form>
          <Item inlineLabel>
            <Label>Id</Label>
            <Input onChangeText={(text)=>{this.dataId=text}} value={this.dataId}/>
          </Item>
          <Item inlineLabel last>
            <Label>name</Label>
            <Input onChangeText={(text)=>{this.dataId=text}} value={this.name}/>
          </Item>
          <Item inlineLabel last>
            <Label>email</Label>
            <Input onChangeText={(text)=>{this.dataId=text}} value={this.email}/>
          </Item>
          <Item inlineLabel last>
            <Label>phone</Label>
            <Input onChangeText={(text)=>{this.dataId=text}} value={this.phone}/>
           
          </Item>
          <Button full bright onPress={this.getButton}>
            <Text>Light</Text>
          </Button> 
          <Button full bright onPress={this.saveButton}>
            <Text>Save</Text>
          </Button>  
          <Button full bright onPress={this.searchButton}>
            <Text>Search</Text>
          </Button>              

          <Button full bright onPress={this.deleteButton}>
            <Text>Delete</Text>
          </Button>     
          <Button full bright onPress={this.updateButton}>
            <Text>Update</Text>
          </Button>       
          <Content>
            {dataDisplay}
          </Content>
        </Form>
      </Content>
    </Container>
    )
  }
}


export default App