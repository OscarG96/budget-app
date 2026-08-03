import { Box, LinearProgress, Typography } from "@mui/material";

type CategoryBudgetProps = {
  name: string;
  spent: number;
  budget: number;
};

export function CategoryBudget({
  name,
  spent,
  budget,
}: CategoryBudgetProps) {
  const percentage = budget > 0 ? (spent / budget) * 100 : 0;

  // Cap the visual progress bar at 100%
  const progressValue = Math.min(percentage, 100);

  const isOverBudget = percentage > 100;
  const isNearBudget = percentage >= 80;

  const progressColor = isOverBudget
    ? "error"
    : isNearBudget
      ? "warning"
      : "primary";

  return (
    <Box >
      {/* Category name + spending */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          mb: 1,
        }}
      >
        <Typography variant="body1" fontWeight={600}>
          {name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          ${spent.toFixed(2)} spent of ${budget.toFixed(2)}
        </Typography>
      </Box>

      {/* Progress bar */}
      <LinearProgress
        variant="determinate"
        value={progressValue}
        color={progressColor}
        sx={{
          height: 8,
          borderRadius: 4,
        }}
      />

      {/* Percentage */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 0.5,
        }}
      >
        <Typography
          variant="caption"
          color={isOverBudget ? "error.main" : "text.secondary"}
          fontWeight={isOverBudget ? 600 : 400}
        >
          {Math.round(percentage)}%
          {isOverBudget && " over budget"}
        </Typography>
      </Box>
    </Box>
  );
}