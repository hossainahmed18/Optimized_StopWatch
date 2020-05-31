import React, { Component } from 'react'
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity
} from 'react-native'

import moment from 'moment'



function RoundButton({ title, color, background, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[styles.button, { backgroundColor: background }]}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

function ButtonsRow({ children }) {
  return (
    <View style={styles.buttonsRow}>{children}</View>
  )
}







export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
      current: 0,
      current2:0
      
    }
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }




  
  start(){
    this.setState({ 
      current2: new Date().getTime(),
      lap2: new Date().getTime()
     },()=>this.icreamenter())
  }
  
  icreamenter(){
    this.timer = setTimeout(() => {
      this.state.current=new Date().getTime()-this.state.current2
      this.state.lap=new Date().getTime()-this.state.lap2
      this.forceUpdate()
      this.icreamenter()
    }, 0)
  }

  

  stop(){
    clearTimeout(this.timer)
    this.setState({
      now: 0,
      now2:0,
    })

  }

   Timer() {
    
    let duration = moment.duration(this.state.current)
    let centiseconds = Math.floor(duration.milliseconds() / 10)
    return (
      <View style={styles.timerContainer}>
        <Text style={styles.timer} >{duration.hours()}:</Text>
        <Text style={styles.timer} >{duration.minutes()}:</Text>
        <Text style={styles.timer} >{duration.seconds()}:</Text>
        <Text style={styles.timer} >{centiseconds}</Text>
      </View>
    )
  }

  Laper() {
    
    let duration = moment.duration(this.state.lap)
    let centiseconds = Math.floor(duration.milliseconds() / 10)
    return (
      <View style={styles.lapcontainer}>
        <Text style={styles.timer} >{duration.hours()}:</Text>
        <Text style={styles.timer} >{duration.minutes()}:</Text>
        <Text style={styles.timer} >{duration.seconds()}:</Text>
        <Text style={styles.timer} >{centiseconds}</Text>
      </View>
    )
  }
  

  
/*

 start(){
  this.timer = setInterval(() => {
    this.setState({ now: this.state.now+1})
  }, 100)
}



stop(){
  this.setState({
    now: 0,
  })
  clearInterval(this.timer)
}

*/



 
lapHandle(){
  this.setState({ 
    lap2: new Date().getTime()
  })
}


 

  render() {
 
     

    return (
      <View style={styles.container}>

        {this.Timer()}
        {this.Laper()}
       
          <ButtonsRow>
           
            <RoundButton
              title='Start'
              color='#50D167'
              background='#1B361F'
              onPress={()=>this.start()}
            />
         
            <RoundButton
              title='Stop'
              color='#E33935'
              background='#3C1715'
              onPress={()=>this.stop()}
            />

            <RoundButton
              title='Lap'
              color='#FFFFFF'
              background='#3D3D3D'
              onPress={()=>this.lapHandle()}
            />
            
         
      
          </ButtonsRow>
     
       
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    paddingTop: 130,
    paddingHorizontal: 20,
  },
  timer: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '200',
    width: 50,
  },

  

  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 18,
  },
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 80,
    marginBottom: 30,
  },

  scrollView: {
    alignSelf: 'stretch',
  },
  fastest: {
    color: '#4BC05F',
  },
  slowest: {
    color: '#CC3531',
  },
  timerContainer: {
    flexDirection: 'row',
  },
  lapcontainer: {
    marginTop: 10,
    flexDirection: 'row',
  }
})


