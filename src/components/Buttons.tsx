import { IconButton, Tooltip } from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import type { FC } from "react";
import { useRouter } from "next/navigation";

type ArticleLinkButtonProps = {
  link: string;
  tooltip?: string;
};

export const ArticleLinkButton: FC<ArticleLinkButtonProps> = ({
  link,
  tooltip,
}) => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(link);
  };
  return (
    <Tooltip title={tooltip}>
      <IconButton color="inherit" onClick={handleClick}>
        <ArticleOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
};
