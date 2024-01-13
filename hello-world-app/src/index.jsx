import ForgeUI, { render, Fragment, Text, IssuePanel, useProductContext, useState, Tooltip, Link, Button, React, TooltipProps } from '@forge/ui';
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
  //console.log("All comments ", comments)

  console.log(`Number of comments on this issue: ${comments.length}`);

  if (comments.length > 0) {
    const lastComment = comments[comments.length - 1];
    console.log("comments author:", comments[0].author.displayName);
    console.log("comments date:", comments[0].created);

    return (
      <Fragment>
        <Text>Hello world ! </Text>
        <Text>
          Number of comments on this issue: {comments.length}
        </Text>
        <Text>
          Owner of the last comment: {lastComment.created}
        </Text>
        <Tooltip text={"Detail Panel"}>
          <Text>Owner of the last comment: {lastComment.author.displayName}</Text>
        </Tooltip>
      </Fragment >
    );
  } else {
    // Eğer yorum yoksa
    return (
      <Fragment>
        <Text>Hello world! No comments on this issue.</Text>
      </Fragment>
    );
  }
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);


