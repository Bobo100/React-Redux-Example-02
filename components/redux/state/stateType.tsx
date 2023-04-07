/////////////////////////////////////// 第三個State 非同步
export interface AsyncState {
    id: number
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    }
}

export interface AsyncStateList {
    AsyncStateList: AsyncState[],
    isLoaded: boolean
    isComplete: boolean
}

export const asyncInitialState: AsyncStateList = {
    AsyncStateList: [],
    isLoaded: false,
    isComplete: false
}

export const asyncInitialState2: AsyncStateList = {
    AsyncStateList: [],
    isLoaded: false,
    isComplete: false
}

