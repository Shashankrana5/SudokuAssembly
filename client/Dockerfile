FROM node:alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
# COPY . .

# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "production" ]; then \
#       npm run build; \
#     else \
#       npm run dev; \
#     fi

# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "production"]; then \
#         npm install; \
#         else \
#             echo "HO" && \
#             docker pull shashankrana5/sudokuassembly:latest; \
#     # else \
#         # npm install && cp . . && npm run build; \
#         # COPY . .; 
#         # RUN npm run build; \
#     fi

FROM node:alpine as runner

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]