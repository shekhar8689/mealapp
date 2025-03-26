import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

const loading = (props) => {
  return (
    <View style={styles.loadingMaineContainer}>
      <ActivityIndicator {...props} />
    </View>
  )
}

export default loading

const styles = StyleSheet.create({
  loadingMaineContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
})
