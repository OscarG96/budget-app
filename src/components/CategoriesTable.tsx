import { CategorySpending, Expense } from "@/types/types"
import { Box, List, ListItem, ListItemText, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"

// import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

type CategoriesTableProps = {
  categories: CategorySpending[]
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({ categories }) => {

  return (
    <section className="px-4 py-1">
      <div className="container m-auto max-w-2xl">
        {/* <h2 className="text-xl text-left font-semibold ml-3">Categories</h2> */}
        <Typography variant="h6" component="div">
          Categories
        </Typography>
        <Table>
          {/* <TableHead>
            <TableRow>
              
              <TableCell>Category</TableCell>
              <TableCell>Spent</TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                {/* <TableCell><LocalGroceryStoreIcon></LocalGroceryStoreIcon> </TableCell> */}
                <TableCell>{category.name}</TableCell>
                <TableCell align="right">${category.totalSpent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
  // return (
  //   <Box>
  //     <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
  //       Text only
  //     </Typography>
  //     <List dense={true}>
  //       {categories.map((category, index) => (
  //         <ListItem>
  //           <ListItemText
  //             primary={category.name}
  //             secondary={category.totalSpent}
  //           />
  //         </ListItem>

  //       ))}
  //     </List>
  //   </Box>
  // )
}