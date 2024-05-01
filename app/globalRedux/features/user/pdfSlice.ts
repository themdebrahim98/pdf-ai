import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDownloadURL, getMetadata, listAll } from "firebase/storage";

export enum LoadingState {
  Idle = "idle",
  Pending = "pending",
  Fulfilled = "fulfilled",
  Rejected = "rejected",
}
export interface PDFItem {
  fileName: string;
  url: string;
  timeStamp: string;
}

export interface PDFState {
  pdfList: PDFItem[];
  loadingFetch: LoadingState;
  loadingDelete: LoadingState;
  fetchError: string;
  deleteError: string;
}

const initialState: PDFState = {
  pdfList: [],
  loadingFetch: LoadingState.Idle,
  loadingDelete: LoadingState.Idle,
  fetchError: "",
  deleteError: "",
};
export interface DeletePDFPayload {
  fileName: string;
  userId: string;
}

// Rest of your code remains unchanged...

export const fetchPDFs = createAsyncThunk(
  "pdf/fetchPDFs",
  async (listRef: any) => {
    try {
      const files: PDFItem[] = [];
      const res = await listAll(listRef);

      await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef);

          const fileDetails: PDFItem = {
            fileName: itemRef.name,
            url,
            timeStamp: metadata.timeCreated,
          };
          console.log(metadata.timeCreated);

          files.push(fileDetails);
        })
      );

      return files;
    } catch (error) {
      throw new Error("Error fetching PDFs");
    }
  }
);
export const deletePDF = createAsyncThunk(
  "pdf/deletePDF",
  async ({ fileName, userId }: DeletePDFPayload) => {
    try {
      const res = await fetch("/api/deleteFileandVectors", {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          pdfName: fileName,
        }),
      });

      if (!res.ok) {
        // Handle HTTP error status (e.g., 404, 500, etc.)
        throw new Error(`Failed to delete PDF - HTTP status: ${res.status}`);
      }
      console.log("deleted");

      // Assuming successful deletion returns some response
      // Add logic here if you need to process the response

      return fileName; // Return the file name for reference
    } catch (error: any) {
      throw new Error(`Error deleting PDF: ${error.message}`);
    }
  }
);
const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    // Other synchronous actions if needed
    pdfDelete: (state, action: PayloadAction<string>) => {
      const res = state.pdfList.filter(
        (pdf) => pdf.fileName !== action.payload
      );
      state.pdfList = res;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPDFs.pending, (state) => {
        state.loadingFetch = LoadingState.Pending;
        state.fetchError = ""; // Clear fetch error on pending fetch
      })
      .addCase(
        fetchPDFs.fulfilled,
        (state, action: PayloadAction<PDFItem[]>) => {
          state.loadingFetch = LoadingState.Fulfilled;
          const sortData = action.payload.sort(
            (a, b) =>
              new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
          );
          state.pdfList = sortData;
        }
      )
      .addCase(fetchPDFs.rejected, (state, action) => {
        state.loadingFetch = LoadingState.Idle;
        state.fetchError = action.error.message || "Error fetching PDFs";
      })
      .addCase(deletePDF.pending, (state) => {
        state.loadingDelete = LoadingState.Pending;
        state.deleteError = ""; // Clear delete error on pending delete
      })
      .addCase(deletePDF.fulfilled, (state, action) => {
        state.loadingDelete = LoadingState.Fulfilled;
        state.pdfList = state.pdfList.filter(
          (pdf) => pdf.fileName !== action.payload
        );
      })
      .addCase(deletePDF.rejected, (state, action) => {
        state.loadingDelete = LoadingState.Idle;
        state.deleteError = action.error.message || "Error deleting PDF";
      });
  },
});

export const { pdfDelete } = pdfSlice.actions;

export default pdfSlice.reducer;
