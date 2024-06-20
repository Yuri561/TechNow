import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

interface WorkRequestProps {
  workOrder: WorkOrder;
}

const WorkRequestItem: React.FC<WorkRequestProps> = ({ workOrder }) => {
  return (
    <TableRow>
      <TableCell>
        <workOrder.icon /> {workOrder.type}
      </TableCell>
      <TableCell>{workOrder.description}</TableCell>
      <TableCell>{workOrder.nte ? `NTE: $${workOrder.nte}` : '-'}</TableCell>
      <TableCell>{workOrder.requestDate.toLocaleDateString()}</TableCell>
      {/* Add more detailed information for a better layout */}
      <TableCell>{workOrder.assignedTo}</TableCell>
      <TableCell>{workOrder.status}</TableCell>
      <TableCell>{workOrder.priority}</TableCell>
      <TableCell>{workOrder.location}</TableCell>
      <TableCell>
        {workOrder.comments && workOrder.comments.length > 0 ? (
          <ul>
            {workOrder.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        ) : '-'}
      </TableCell>
      {/* Add more cells for additional work order properties if needed */}
    </TableRow>
  );
};

export default WorkRequestItem;