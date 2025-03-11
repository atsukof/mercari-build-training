FROM python:3-alpine

WORKDIR /app
RUN addgroup -S mercari && adduser -S trainee -G mercari

COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app

RUN python -m venv /app/venv
ENV PATH="/app/venv/bin:$PATH"

RUN chown -R trainee:mercari /app
USER trainee

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9000"]
