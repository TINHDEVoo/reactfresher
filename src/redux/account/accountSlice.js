import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isloading: true,
    tempAvatar: undefined,
    user: {
        "email": "",
        "phone": "",
        "fullName": "",
        "role": "",
        "avatar": "",
        "id": ""
    }
};

export const accountSlide = createSlice({
    name: 'account',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        doLoginAction: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isAuthenticated = true;
            state.isloading = false
            state.user = action.payload
        },
        doGetAccountAction: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isAuthenticated = true;
            state.isloading = false
            state.user = action.payload.user
        },
        doLogoutAccountAction: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isAuthenticated = false;
            state.isloading = true
            state.user = {
                "email": "",
                "phone": "",
                "fullName": "",
                "role": "",
                "avatar": "",
                "id": ""
            }
        },
        doUpdateAccountAction: (state, action) => {
            state.user.avatar = action.payload.avatar;
            state.user.phone = action.payload.phone;
            state.user.fullName = action.payload.fullName;
        },
        doUploadAvatarAction: (state, action) => {
            state.tempAvatar = action.payload;
        }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {

    },
});

export const { doUpdateAccountAction, doUploadAvatarAction, doLoginAction, doGetAccountAction, doLogoutAccountAction } = accountSlide.actions;


export default accountSlide.reducer;
