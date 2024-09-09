from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import Question
from .serializers import QuestionSerializer

# Create your views here.

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    @action(detail=False, methods=['post'])
    def custom_create(self, request):
        question = request.data.get('question')
        answer = request.data.get('answer')

        if not question:
            return Response({'error': 'Missing either question, answer, or score field in request.'})
        
        new_question = Question.objects.create(
            question=question,
            answer=answer,
            score=0
        )

        serializer = self.get_serializer(new_question)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
