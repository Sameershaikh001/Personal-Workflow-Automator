# backend/workflows/meeting_scheduler.py
from langgraph.graph import Graph
from langgraph.prebuilt import create_react_agent

class MeetingScheduler:
    def __init__(self):
        self.graph = self._build_workflow()
    
    def _build_workflow(self):
        # Define multi-step workflow
        workflow = Graph()
        
        # Add nodes for each step
        workflow.add_node("parse_request", self.parse_request)
        workflow.add_node("check_calendar", self.check_calendar)
        workflow.add_node("create_event", self.create_event)
        workflow.add_node("send_emails", self.send_emails)
        workflow.add_node("update_notion", self.update_notion)
        
        # Define flow
        workflow.add_edge("parse_request", "check_calendar")
        workflow.add_edge("check_calendar", "create_event")
        workflow.add_edge("create_event", "send_emails")
        workflow.add_edge("send_emails", "update_notion")
        
        return workflow.compile()
    
    def schedule_meeting(self, request):
        return self.graph.invoke({"request": request})