FROM alpine

RUN apk update
RUN apk add --no-cache python3 py3-pip
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

RUN python3 -m venv /app/venv
ENV PATH="/app/venv/bin:$PATH"
RUN pip3 install -r requirements.txt


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9000"]
