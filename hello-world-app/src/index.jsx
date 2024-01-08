import ForgeUI, { render, Fragment, Text, IssuePanel,useProductContext, useState, useEffect } from '@forge/ui';
import api, { route } from "@forge/api";

const fetchCommentsForIssue = async (issueId) => {
  const res = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/${issueId}/comment`);

  const data = await res.json();
  return data.comments;
};


const App = () => {
  const context = useProductContext();
  const [comments] = useState(async () => await fetchCommentsForIssue(context.platformContext.issueKey));

  console.log(`Number of comments on this issue: ${comments.length}`);
  console.log("comments author :", comments[0].author.displayName)
  console.log("comments date : ", comments[0].created)

  return (
    <Fragment>
      <Text>Hello world!</Text>
      <Text>
        Number of comments on this issue: {comments.length}
      </Text>
      <Text>
        Owner of the last comment: {comments[comments.length-1].author.displayName}  
      </Text>
      <Text>
        Date and time of the last comment: {comments[comments.length-1].created}
      </Text>
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);



