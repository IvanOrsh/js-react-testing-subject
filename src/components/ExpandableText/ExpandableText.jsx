import { useState } from "react";
import { Button, Typography } from "@mui/material";

const ExpandableText = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 300;

  if (!children) return null;

  if (children.length <= limit) {
    return <Typography>{children}</Typography>;
  }

  const summary = expanded ? children : `${children.substring(0, limit)}...`;

  return (
    <Typography>
      {summary}
      <Button size="xs" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Show Less" : "Read More"}
      </Button>
    </Typography>
  );
};

export default ExpandableText;
