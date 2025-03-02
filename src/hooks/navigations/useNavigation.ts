import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
const useNavigaions = () => {
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const onNavigation = (routeName: string) => {
        navigation.navigate(routeName)
    }
    const onNavigationWithParams = (routeName: string, params: object) => {
        navigation.navigate(routeName, params)
    }
    const goBack = () => {
        navigation.goBack()
    }
    return { onNavigation, onNavigationWithParams, goBack }
}
export default useNavigaions