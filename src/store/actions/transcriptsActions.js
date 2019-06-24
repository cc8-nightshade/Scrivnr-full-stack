export const getTranscripts = email => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    Promise.all([
      firestore
        .collection("dialogues")
        .where("caller", "==", email)
        .get(),
      firestore
        .collection("dialogues")
        .where("receiver", "==", email)
        .get()
    ])
      .then(results => {
        console.log("results: ", results);
        let transcriptsArray = [];
        results.forEach(result => {
          result.forEach(doc => {
            const data = doc.data();
            console.log(data);
              transcriptsArray.push({
                caller: data.caller,
                receiver: data.receiver,
                speech: data.speech,
                startDate: typeof data.startDateTime === "string" ? new Date(data.startDateTime) : data.startDateTime.toDate(),
                id: doc.id
              });
          });
        })
        console.log("Arr",transcriptsArray);
        // transcriptsArray.sort(
        //   (a, b) => {
        //     console.log(b.startDate.toDate(), a.startDate.toDate());
        //     return b.startDate.toDate() - a.startDate.toDate()
        //   }
        // );
        dispatch({ type: "transcripts/GET_TRANSCRIPTS", transcriptsArray });
      })
      .catch(err => {
        dispatch({ type: "transcripts/GET_TRANSCRIPTS_ERROR", err });
      });

    // firestore.collection("dialogues")
    // .where("caller", "==", email)
    // .get()
    // .then(querySnapshot => {
    //   let transcriptsArray = [];
    //     querySnapshot.forEach(doc => {
    //       const data = doc.data();
    //       transcriptsArray.push({
    //         caller: data.caller,
    //         receiver: data.receiver,
    //         speech: data.speech,
    //         startDate: data.startDateTime,
    //         id: doc.id
    //       });
    //     });
    //   dispatch({ type: "transcripts/GET_TRANSCRIPTS", transcriptsArray });
    // })
    // .catch((err) => {
    //   dispatch({ type: "transcripts/GET_TRANSCRIPTS_ERROR", err})
    // })
  };
};

export const setTranscript = (transcript, index) => {
  //const transcript = {}
  console.log("set transcript");
  console.log("index:", index);
  return { type: "transcripts/SET_TRANSCRIPT", transcript, index };
};

export const updateQuestionable = (transcript, index) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    transcript.speech[index].questionable = !transcript.speech[index]
      .questionable;
    firestore
      .collection("dialogues")
      .doc(transcript.id)
      .update({
        speech: transcript.speech
      })
      .then(() => {
        dispatch({
          type: "transcripts/UPDATE_QUESTIONABLE",
          transcript,
          index
        });
      });
  };
};
