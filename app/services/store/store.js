import { configureStore } from "@reduxjs/toolkit";
import firebaseReducer from "../firebase/firebaseSlice";
import AssignReducer from "../../../components/Assign/AssignSlice";
import SignDocumentReducer from "../../../components/SignDocument/SignDocumentSlice";
import ViewDocumentReducer from "../../../components/ViewDocument/ViewDocumentSlice";
import MergeAnnotationsSlice from "../../../components/MergeAnnotations/MergeAnnotationsSlice";
export default configureStore({
  reducer: {
    mergeAnnotation: MergeAnnotationsSlice,
    firebase: firebaseReducer,
    assign: AssignReducer,
    signDoc: SignDocumentReducer,
    viewDoc: ViewDocumentReducer,
  },
});
