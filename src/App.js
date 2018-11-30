import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {civilite: 'Monsieur',prenom:'',nom:'',email:'',tel:'',choice:'',step:1};
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
      let obj = {};
      obj[event.target.name]=event.target.value
      this.setState(obj);
  }
  handleClick() {
    let x = this.state.step+1;
    if (this.state.step===1){
        if(this.checkVide())
        {
            if (this.validateEmail(this.state.email)){
                this.setState({step:x});
                console.log(this.state.step);
            }
            else{
              alert("Email non valide");
            }
        }
        else {
            alert('Tous les champs son obligatoire');
        }
    }
    else if(this.state.step===2){
      if(this.state.choice!==''){
          this.setState({step:x});
      }
      else {
        alert('Il faut choisir');
      }
    }
    else if(this.state.step===3){
      let url = 'http://localhost:3001/forms';
      let obj = {
          civilite: this.state.civilite,
          prenom:this.state.prenom,
          nom:this.state.nom,
          email:this.state.email,
          tel:this.state.tel,
          choice:this.state.choice
      }
      fetch(url, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj)
      })
    }

  }
  checkVide() {
    return this.state.civilite!=='' && this.state.prenom!=='' && this.state.nom!=='' && this.state.email!=='' && this.state.tel!=='';
  }
  validateEmail(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
  render() {
    switch (this.state.step) {
        case 1:
            return <div className="App">
                <div><select name="civilite" value={this.state.civilite}  onChange={this.handleChange}>
                    <option value="Monsieur">Monsieur</option>
                    <option value="Madame">Madame</option>
                </select></div>
                <div>prenom : <input type="text" name="prenom" value={this.state.prenom}  onChange={this.handleChange}/></div>
                <div>nom : <input type="text" name="nom" value={this.state.nom}  onChange={this.handleChange}/></div>
                <div>email : <input type="text" name="email" value={this.state.email}  onChange={this.handleChange}/></div>
                <div>tel : <input type="text" name="tel" value={this.state.tel}  onChange={this.handleChange}/></div>
                <div><button onClick={this.handleClick}>Suivant</button></div>
            </div>
        case 2:
            return<div className="App">
                <div>Qu'elle est votre framework du coeur</div>
                <input type="radio" name="choice" value='Django' onChange={this.handleChange} />Django
                <input type="radio" name="choice" value='Lavravel' onChange={this.handleChange} />Lavravel
                <input type="radio" name="choice" value='React' onChange={this.handleChange} />React
                <div>
                    autre : <textarea name='choice' value={this.state.value} onChange={this.handleChange} />
                </div>
                <div><button onClick={this.handleClick}>Suivant</button></div>

            </div>
        case 3:
            return<div className="App">
                <div>civilite : {this.state.civilite} </div>
                <div>prenom : {this.state.prenom}</div>
                <div>nom :  {this.state.nom}</div>
                <div>email : {this.state.email}</div>
                <div>tel :  {this.state.tel}</div>
                <div>framework du coeur :  {this.state.choice}</div>
                <div><button onClick={this.handleClick}>Save</button></div>
            </div>
    }
  }
}

export default App;
