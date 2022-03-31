import UserResolver from './userresolver';
import AuthResolver from './authresolver';
import CommentResolver from './commentresolver';
import NotificationResolver from './notificationresolver';
import ProjectResolver from './projectresolver';
import SprintResolver from './sprintresolver';
import UserToProjectResolver from './usertoprojectresolver';
import TicketResolver from './ticketresolver';
import VerifyResolver from "./Verify"

const resolversGQL  = [
  UserResolver,
  AuthResolver,
  CommentResolver,
  NotificationResolver,
  ProjectResolver,
  SprintResolver,
  UserToProjectResolver,
  TicketResolver,
  VerifyResolver
];

export default resolversGQL;
