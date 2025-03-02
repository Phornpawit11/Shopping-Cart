import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { memo, useMemo } from 'react'
import EmptyListStyle from './EmptyList.style'
import { EmptyListType } from '../../../model/mixs'
import { ErrorListComponent } from '../ErrorListComponents'
const style = EmptyListStyle
const EmptyList = (props: EmptyListType) => {
  const EmptyConponentRenderer = () => {
    return (
      <Text>EmptyList</Text>
    )
  }
  const Renderer = useMemo(() => {
    return props.isError ?
      <ErrorListComponent onRefresh={props.onRefresh} />
      : <EmptyConponentRenderer />
  }, [props.isError])
  return (
    <View style={{}}>
      {props.isLoading ?
        <Image source={require('../../../assets/list.png')} style={{ width: "90%", resizeMode: 'contain' }} />
        : <>
          {Renderer}
        </>
      }
    </View>
  )
}

export default memo(EmptyList)
