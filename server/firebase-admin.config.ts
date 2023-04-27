import * as admin from 'firebase-admin';

const firebaseConfig = {
  credential: admin.credential.cert({
    // eslint-disable-next-line prettier/prettier
    projectId: "capstone-ec476",
    // eslint-disable-next-line prettier/prettier
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxTrk8a+WC0cNp\nhm8zywxzZXVk9vO6Yp/ytFusX+PKmQpWZrR4yOG0xbEYZbM/hJF12WQ+5VTI5tPm\nvZx3CDNs0WbAabFl2uTG2IFjPwEG+rJzUswddvy5A5pPQb1GYM37RN+kU75vbdoz\nz239uR76OctJ5xGCJVz0U4pO4PeYapOC1x3gzEwc9a26/3QULIWJI9qUUWoInU/3\n1HA5SY/JYXyDfokrnO+Zb5kRb1Qft1EAQaCgHgdDnESR6y/oWG7SFGk5C6F6tFV5\nx6+LqIhF01UPRmSrHeVaudLF3KO12CG/8ui/SaUHdqETOzbtbZgRTuCf2FSIZV2o\nuJr6w4XHAgMBAAECggEADQXQsiDknwqkFSSUF1RDCli52hwPQ7HJuKxJjWwPkYpT\nCYyKldJ/TWU1wCp8E167xlGcvMfgRc86YhisHMwD5uqsZtZ8epQsuHQfcLgobahN\nIg5DQqjCIB6lH0wfSEOE7X8eA/ZIpuuFGsgR9pA5t7w186wei5YN8T4PiwKX/OA7\nbATramrapuONS4SdocA8LjAV6l4SSn2z6PlgAKI4koZb1kW41XLgxbC6vDe8l/Fi\nK+8WD1mXbQsWpNrKUWS9pg0dR409Be/x2VcS6sebWZR63C1vhFTUALlMIMhkyIv4\n2mGxV/qKsn2WkjGU5Amy1dLqTugPO8IxVTCt/aHqaQKBgQD2UVUm71NowMRb2r7Y\neo9tbHEqe4pF04+DjTIabF+5pyOvIVM18+hNSrKNyIskWQ86PqlyF6UrUqbc7+f8\njmZCnsULgrjlIo/Pm92cqoxHV1WSfng6fV1R3k0gZwFrnEOHTwQ6PdN+4bCHmL02\nyWYzDjsZTFbWIUuqCdNeL0p8zwKBgQC4RvL7yqkK1g1pOE2GA7jptp/NWbB6CuEn\n77YYG1j6w6hjzocq8st29YyY/uM9Rm6JuP3XxGbyuSsH2hkoA3CCKAw0OFR10DTq\nNZ5Tjv5N5gR6R9JNgU/qR3bWDXUaUffgR3kiMqY3v+lpBsGXtUTa61FAg83Ad3VV\nF8E/wapViQKBgFqwDTrdiIcb2e+7tOI9FYuDDpNGkt0sjD0yAg1qc0AGQoQbL+jA\nWXoDk4PSHzCNvaaDJZ3FCOHPd3IGvhHlV88VZ5TaVzq9o9cbGtewjx9BD1d1Ssy2\nFWKsBxdz9Tjqeo5Z0EOlObYQYA88dAW01vTbO3UP/zStY49CONkHblRPAoGAZQzy\n/cQ6Qmjy3bo0OMMdyXuN0evW7HW+1kmLD1kfyBM26dQ9Jv4ROOCaAuPy9I0E3J0H\nBiT7VyrXP+0HUnvgXF9dod0p45kTC0Pv2F5XcZwq5GsyFbJNgmlB70td5dsBFInd\nETW5FGU2t5Mu4eRTJ8FWwwwD7gET5F+sZyvqHhECgYAwQJQP17E0bGgr6hO2yt5G\n/IT6F2xccczdyvK/KiaWQ9P5JDyjMGhwvu2Qw5nkXuH4lZYQL9+7zCbtWgkIdRmC\n8k0g65tjluqSZEK+75dblnzF5EVhs5o+/Ieg9ZWaZWKEPBsn2CpFyDvjKuS7vwe0\ncmpr6qKBDQldmLgGv95rmA==\n-----END PRIVATE KEY-----\n",
    clientEmail:
      'firebase-adminsdk-btm23@capstone-ec476.iam.gserviceaccount.com',
  }),
  databaseURL: 'https://capstone-ec476.firebaseio.com',
};

admin.initializeApp(firebaseConfig);

export default admin;
