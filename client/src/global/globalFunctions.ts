export const changeStateKey = (key: string, value: any, setState: (value: React.SetStateAction<any>) => void) => {
    setState((prevState: any) => {
        return {
            ...prevState,
            [key]: value
        }
    });
}