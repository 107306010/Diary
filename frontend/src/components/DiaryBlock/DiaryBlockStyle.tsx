const DiaryBlockStyle = {
    buttonBase:{
        width: "80%",
        display: 'block'
    },
    card:{
        width: "100%",
        height: "300px"
    },
    test: (theme: any) => ({
        color: theme.palette.secondary.main,
    })
} as const

export default DiaryBlockStyle;